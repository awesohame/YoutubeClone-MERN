import { useSelector } from "react-redux";

import Layout from "../../Layout/Layout";
import UpdateAccountDetailsForm from "../../components/accountForms/UpdateAccountDetailsForm";
import UpdatePasswordForm from "../../components/accountForms/UpdatePasswordForm";
import Tabs from "../../components/Tabs";
import Loader from "../../components/Loader";

export default function Account() {
    const { user: appLoading } = useSelector(
        (state) => state.appLoading
    );

    const tabs = [
        { label: "Account", component: <UpdateAccountDetailsForm /> },
        { label: "Password", component: <UpdatePasswordForm /> },
    ];

    return appLoading ? (
        <Loader />
    ) : (
        <Layout className="flex justify-center md:items-center max-md:mt-16">
            <Tabs tabs={tabs} />
        </Layout>
    );
}