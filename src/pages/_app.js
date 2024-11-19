// pages/_app.js
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';


function MyApp({ Component, pageProps }) {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <Notifications />
            <Component {...pageProps} />
        </MantineProvider>
    );
}

export default MyApp;