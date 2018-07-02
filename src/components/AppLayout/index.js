import React from 'react';
import PropTypes from 'prop-types';
import { LocaleProvider, Layout } from 'antd';

import pl_PL from 'antd/lib/locale-provider/pl_PL';
import Menu from './Menu';
import './style.less';

const { Sider, Content, Footer } = Layout;

const AppLayout = ({ children, loggedUser, location, currentRoute, currentRouteName }) => (
  <LocaleProvider locale={pl_PL}>
    <Layout className="app-root">
      <Sider breakpoint="lg" collapsedWidth="0" className="rtc-talker-side">
          <div className="rtc-talker-logo">RTC-Talker</div>
          <Menu routeName={currentRouteName} loggedUser={loggedUser} />
      </Sider>
      <Layout className="app-content-wrapper">
        <Content className="app-content">
          {React.cloneElement(children, { location })}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            RTC-Talker &copy; 2018 Tomasz Bajorek
        </Footer>
      </Layout>
    </Layout>
  </LocaleProvider>
);

export default AppLayout;
