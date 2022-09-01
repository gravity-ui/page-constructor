#!/bin/bash -e

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Для маков, на которых нет утилиты ya https://wiki.yandex-team.ru/yatool/distrib/
if command -v ya
then
    aws_cli="ya tool aws"
    jq="ya tool jq"
else 
    aws_cli="aws"
    jq="jq"
fi


function _show_error {
    set -e
    echo -e "${RED}\n🛑🛑🛑🛑🛑🛑\n\nError:${NC}\n${1}\n\n🛑🛑🛑🛑🛑🛑\n"  >&2
    exit 1
}

function _show_success {
    set -e
    echo -e "\n✅✅✅✅✅✅\n\n${GREEN}${1}${NC}\n${2}\n\n✅✅✅✅✅✅\n" >&2
}

# Достаем название проекта
function _get_project_name {
    set -e
    project=$(cat package.json | eval $jq -r '.name' | sed -e "s/@yandex-data-ui\///g")

    if [[ "$project" == null ]] || [[ -z "$project" ]]
    then
        _show_error "Не найдено значение проекта в package.json"
        exit 1
    fi

    echo $project
}

# Достаем название ветки
function _get_branch_name {
    set -e
    if [ ! -f .arcignore ] && [ ! -f .gitignore ]
        then
            _show_error "Не найден .arcignore и .gitignore. Не могу определить VCS"
            exit 1
    elif [ -f .arcignore ] && [ -f .gitignore ]
        then
            _show_error "Найдены одновременно .arcignore и .gitignore. Не могу определить VCS"
            exit 1
    elif [ -f .arcignore ] # arc
        then
            branch=$(arc info --json | eval $jq -r '.branch' | sed 's/[/.]/_/g')
    else # git
        branch=$(git symbolic-ref --short HEAD | sed 's/ *$//g')
    fi  

    if [[ "$branch" == null ]] || [[ -z "$branch" ]]
    then
        _show_error "Не найдено значение ветки"
        exit 1
    fi

    echo $branch
}

function _get_target_folder {
    set -e
    project=$(_get_project_name)
    branch=`_get_branch_name`

    if [[ "$branch" == "master" ]] || [[ "$branch" == "trunk" ]]
    then
        folder="cloud-storybooks/master/${project}/"
    else
        folder="cloud-storybooks/branches/${project}/${branch}/"
    fi

    echo $folder
}

function get_storybook_link {
    set -e
    folder=$(_get_target_folder)
    _show_success "Ссылка на сторибук текущей ветки:" "https://s3.mds.yandex.net/${folder}index.html"
}

function deploy {
    set -e
    trap 'exit 1' ERR
    # Проверяем ключи для заливки на S3
    if [[ -z "$CLOUD_S3_ACCESS_KEY_ID" ]] || [[ -z "$CLOUD_S3_SECRET_ACCESS_KEY" ]]
    then
        _show_error "Нужно установить переменные CLOUD_S3_ACCESS_KEY_ID и CLOUD_S3_SECRET_ACCESS_KEY из секрета https://yav.yandex-team.ru/secret/sec-01dsjcj6ythgjshaw987je5qzr/explore/versions"
        exit 1
    fi

    if [[ ! -d storybook-static/ ]]
    then
        echo -e $(_show_error "Не найдена папка storybook-static/ с билдом")
        exit 1
    fi

    branch=$(_get_branch_name)
    folder=$(_get_target_folder)

    echo "⏩⏩⏩⏩⏩⏩"
    echo "Заливаю в папку ${folder}"
    
    AWS_ACCESS_KEY_ID=$CLOUD_S3_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$CLOUD_S3_SECRET_ACCESS_KEY eval $aws_cli --endpoint-url="http://s3.mds.yandex.net" s3 cp --recursive "storybook-static/" s3://$folder \
    && get_storybook_link

    echo "Готово!"
    echo "⏩⏩⏩⏩⏩⏩"
}

"$@"