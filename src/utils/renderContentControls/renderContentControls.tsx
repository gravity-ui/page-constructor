import React, {Fragment} from 'react';

import {Buttons, Links} from '../../components';
import {ButtonProps, ContentSize, LinkProps} from '../../models';
import {block} from '../../utils';

import './ContentControls.scss';

const b = block('content-controls');

type ContentControlsArgs = {
    links?: LinkProps[];
    buttons?: ButtonProps[];
    titleId?: string;
    size?: ContentSize;
    qa?: Record<string, string>;
};
const renderContentControls = (
    {links, buttons, titleId, size = 's', qa = {}}: ContentControlsArgs,
    renderContainer: (children: React.ReactElement) => React.ReactElement = (children) => children,
) => {
    const {links: linksQa, link: linkQa, buttons: buttonsQa, button: buttonQa} = qa;

    return links || buttons
        ? renderContainer(
              <Fragment>
                  <Links
                      className={b('links', {size})}
                      size={size}
                      links={links}
                      titleId={titleId}
                      qa={linksQa}
                      linkQa={linkQa}
                  />
                  <Buttons
                      className={b('buttons', {size})}
                      size={size}
                      buttons={buttons}
                      titleId={titleId}
                      qa={buttonsQa}
                      buttonQa={buttonQa}
                  />
              </Fragment>,
          )
        : null;
};

export default renderContentControls;
