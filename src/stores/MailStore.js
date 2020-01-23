import { postAPI } from "@/stores/helpers/mailjet.js";

const MailStore = {
    namespaced: true,
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {
        async sendInviteEmail({ commit }, { email, workspace_id}) {
            const data = {
                service_id: 'mailjet',
                template_id: 'template_JVbRr5Ra',
                user_id: 'user_74sOICb7ydQbTZEepaR0R',
                template_params: {
                    'from_name': 'Strellus',
                    'to_email': email,
                    'message_html': '<h1>TEST</h1>'
                }
            };

            const response = await postAPI("send", data);
        },
    }
};

export default MailStore;