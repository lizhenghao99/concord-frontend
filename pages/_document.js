// contents/_document.js
// noinspection HtmlRequiredTitleElement

import emotionCache from '/lib/emotion-cache';
import theme from '/themes/theme';
import { ColorModeScript } from '@chakra-ui/react';
import createEmotionServer from '@emotion/server/create-instance';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

const { extractCritical } = createEmotionServer(emotionCache);

export default class Document extends NextDocument {
    static async getInitialProps(ctx) {
        const initialProps = await NextDocument.getInitialProps(ctx);
        const styles = extractCritical(initialProps.html);
        return {
            ...initialProps,
            styles: [
                initialProps.styles,
                <style
                    key="emotion-css"
                    dangerouslySetInnerHTML={{ __html: styles.css }}
                    data-emotion-css={styles.ids.join(' ')}
                />,
            ],
        };
    }

    render() {
        return (
            <Html>
                <Head/>
                <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}