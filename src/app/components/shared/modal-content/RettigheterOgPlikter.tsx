import * as React from 'react';
const { FormattedMessage, injectIntl } = require('react-intl');
const { Undertittel, Normaltekst } = require('nav-frontend-typografi');
import getMessage from '../../../util/i18n';

import './modalContent.less';

interface Props {
    intl: object;
}

const RettigheterOgPlikter: React.StatelessComponent<Props> = ({ intl }) => (
    <div className="modalContent">
        <Undertittel className="modalContent__header">
            {getMessage(intl, 'rettigheter.sectionheading.rettigheterOgPlikter')}
        </Undertittel>
        <ul>
            <li>
                <Normaltekst>
                    {getMessage(intl, 'rettigheter.text.sammeBarnet')}
                </Normaltekst>
            </li>
            <li>
                <Normaltekst>
                    {getMessage(intl, 'rettigheter.text.innhenteOpplysninger')}
                </Normaltekst>
                <ul className="modalContent__sublist">
                    <li>
                        <Normaltekst>
                            {getMessage(intl, 'rettigheter.text.innhenteOpplysninger.1')}
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            {getMessage(intl, 'rettigheter.text.innhenteOpplysninger.2')}
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            {getMessage(intl, 'rettigheter.text.innhenteOpplysninger.3')}
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            {getMessage(intl, 'rettigheter.text.innhenteOpplysninger.4')}
                        </Normaltekst>
                    </li>
                    <li>
                        <Normaltekst>
                            {getMessage(intl, 'rettigheter.text.innhenteOpplysninger.5')}
                        </Normaltekst>
                    </li>
                </ul>
            </li>
            <li>
                <Normaltekst>
                    {getMessage(intl, 'rettigheter.text.uretteOpplysninger')}
                </Normaltekst>
            </li>
            <li>
                <Normaltekst>
                    <FormattedMessage
                        id="rettigheter.text.lestOgForstått"
                        values={{
                            link: (
                                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                                <a
                                    href="https://nav.no/rettOgPlikt"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FormattedMessage id="rettigheter.text.lestOgForstått.link" />
                                </a>
                            )
                        }}
                    />
                </Normaltekst>
            </li>
        </ul>
    </div>
);

export default injectIntl(RettigheterOgPlikter);
