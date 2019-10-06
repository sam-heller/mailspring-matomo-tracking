"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailspring_exports_1 = require("mailspring-exports");
const matomo_domain = 'your-matomo-domain-goes-here';
const PLUGIN_ID = `matomo-pixel-${matomo_domain}`;
class MatomoPixelExtendComposerExtension extends mailspring_exports_1.ComposerExtension {
    static needsPerRecipientBodies(draft) {
        return !!draft.metadataForPluginId(PLUGIN_ID);
    }

    static applyTransformsForSending({ draftBodyRootNode, draft, recipient, }) {
        const messageUid = draft.headerMessageId;
        const epoch = Math.floor(new Date().getTime() / 1000)
        const serverUrl = `https://${matomo_domain}.matomo.cloud/matomo.php`;
        const queryParams = [
            `idsite=1`,
            `rec=1`,
            `action_name=${draft.subject}`,
            `_id=${draft.id}`,
            `uid=${recipient.email}`,
            `url=http://${recipient.email}/${draft.subject}/${messageUid.replace(/@.*$/, '')}/${epoch}`,
            `e_c=Email Open`,
            `e_a=${recipient.email}`,
            `e_n=${draft.subject}`,
            `e_v=${epoch}`,
            `rand=${Math.random()}`

        ].join('&');
        const trackingUrl = encodeURI([serverUrl, queryParams].join('?'));
        const imageInclude =  `<img class="mailspring-open" width="0" height="0" style="border:0; width:0; height:0;" src="${trackingUrl}">`             
        const imgFragment = document
            .createRange()
            .createContextualFragment(imageInclude);
        const beforeEl = draftBodyRootNode.querySelector('.gmail_quote');
        
        if (beforeEl) {
            beforeEl.parentNode.insertBefore(imgFragment, beforeEl);
        }
        else {
            draftBodyRootNode.appendChild(imgFragment);
        }
        draft.directlyAttachMetadata(PLUGIN_ID, {uid: messageUid});
    }
    static onSendSuccess(draft) {
        let metadata = draft.metadataForPluginId(PLUGIN_ID);
        if (metadata) {
            mailspring_exports_1.FeatureUsageStore.markUsed(PLUGIN_ID);
        }
    }
}
exports.default = MatomoPixelExtendComposerExtension;
