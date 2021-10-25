'use strict';

module.exports = {
    meta: {
        type: 'problem',
        schema: [],
    },
    create: function (context) {
        return {
            ImportDeclaration(node) {
                if (node.source.type === 'Literal' && node.source.value === 'bem-cn-lite') {
                    context.report({
                        node: node.source,
                        message: 'Use custom utility with prefix support: "src/utils/cn.ts"',
                    });
                }
            },
        };
    },
};
