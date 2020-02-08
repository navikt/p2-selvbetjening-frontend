import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { EtikettLiten } from 'nav-frontend-typografi';
import { FodtBarn, UfodtBarn } from '../../types/domain/Barn';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { isAttachmentWithError } from 'common/storage/attachment/components/util';
import AttachmentList from 'common/storage/attachment/components/AttachmentList';
import DisplayTextWithLabel from 'components/display-text-with-label/DisplayTextWithLabel';
import getMessage from 'common/util/i18nUtils';
import '../../styles/engangsstonad.less';

interface Props {
    barn: FodtBarn & UfodtBarn;
}

const BarnOppsummering: React.StatelessComponent<Props & WrappedComponentProps> = (props) => {
    const { intl } = props;
    const {
        antallBarn,
        erBarnetFødt,
        fødselsdatoer,
        terminbekreftelse,
        termindato,
        terminbekreftelseDato
    } = props.barn;

    let antallBarnSummaryText;
    if (antallBarn === 1) {
        antallBarnSummaryText = getMessage(intl, 'numberOfChildren.1');
    } else if (antallBarn === 2) {
        antallBarnSummaryText = getMessage(intl, 'numberOfChildren.2');
    } else {
        antallBarnSummaryText = getMessage(intl, 'oppsummering.text.flereAntallBarn', {
            antall: antallBarn!
        });
    }

    return (
        <div className=" blokk-m">
            <DisplayTextWithLabel
                label={getMessage(intl, 'oppsummering.text.soknadenGjelder')}
                text={antallBarnSummaryText}
            />
            {erBarnetFødt && (
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.text.medFødselsdato')}
                    text={fødselsdatoer}
                />
            )}
            {!erBarnetFødt && termindato && terminbekreftelseDato && (
                <div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'termindato')}
                        text={termindato}
                    />
                    <div className="oppsummering__attachments">
                        <EtikettLiten className="textWithLabel__label">
                            {getMessage(intl, 'oppsummering.text.vedlagtTerminbekreftelse')}
                        </EtikettLiten>
                        <AttachmentList
                            attachments={terminbekreftelse.filter((a: Attachment) => !isAttachmentWithError(a))}
                        />
                    </div>
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.text.somErDatert')}
                        text={terminbekreftelseDato}
                    />
                </div>
            )}
        </div>
    );
};
export default injectIntl(BarnOppsummering);
