import React from 'react';
import classNames from 'classnames';

import CustomSVG from '../custom-svg/CustomSVG';
import infoIcon from '../../../assets/svg/employee_nautral.svg';
import alertIcon from '../../../assets/svg/employee_sad.svg';
import warningIcon from '../../../assets/svg/employee_warning.svg';
import successIcon from '../../../assets/svg/employee_happy.svg';

import './dialogBox.less';

type Props = {
    type: string,
    children: any
}

const getIcon = (type) => {
    switch (type) {
        case 'success': return successIcon;
        case 'alert': return alertIcon;
        case 'warning': return warningIcon;
        default: return infoIcon;
    }
};


const getClassnames = (props) => classNames('dialogBox', {
    'dialogBox--info': props.type === 'info',
    'dialogBox--fare': props.type === 'fare',
    'dialogBox--advarsel': props.type === 'fare',
    'dialogBox--suksess': props.type === 'suksess'
});

const DialogBoxBase = (props: Props) => {
    const { type } = props;

    return (
        <div className={getClassnames(props)}>
            <CustomSVG
                className="dialogImage"
                iconRef={getIcon(type)}
                size={96}
            />
            <div className="dialogText">
                {props.children}
            </div>
        </div>
    );
};

const DialogBox = (props) => (<DialogBoxBase {...props} />);
export default DialogBox;