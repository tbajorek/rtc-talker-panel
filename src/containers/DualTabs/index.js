import React from 'react';
import { Tabs } from 'antd';
import {getLoggedUser} from "../../reducers/loggedUser";
import userChecker from "../../utils/userChecker";
import connect from "react-redux/es/connect/connect";

const TabPane = Tabs.TabPane;

const mapStateToProps = state => ({
    loggedUser: getLoggedUser(state)
});

const DualTabs = ({loggedUser, tab1, tab2}) => (
    <Tabs defaultActiveKey="1">
        {userChecker(loggedUser, tab1) ? <TabPane tab={tab1.title} key="1">
            {tab1.content}
        </TabPane> : null}
        {userChecker(loggedUser, tab2) ? <TabPane tab={tab2.title} key="2">
            {tab2.content}
        </TabPane> : null}
    </Tabs>
);

export default connect(mapStateToProps, {})(DualTabs)
