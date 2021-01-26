import { defaultLocale, locales } from '../locales'

export default function CatchAll(props) {
  return (
    <div>404</div>
  )
}

export const getServerSideProps = async (ctx) => {
  const locale = (`${ctx.req.url}`.split('/') || [])[1]

  console.log(ctx.req.url, locale)

  if (locale !== '_next') {
    if (locale === defaultLocale) {
      const { res } = ctx;
      const url = `${ctx.req.url}`.replace(`/${defaultLocale}`, '')
      res.setHeader('location', url || '/');
      res.statusCode = 302;
      res.end();
      return {
        props: {},
      };
    }
    const isSupportedLocale = locales.indexOf(locale) !== -1
    if (!isSupportedLocale) {
        const { res } = ctx;
        res.setHeader('location', `/404`);
        res.statusCode = 302;
        res.end();
        return {
          props: {},
        };
    } else {
      const { res } = ctx;
      res.setHeader('location', `/${locale}/404`);
      res.statusCode = 302;
      res.end();
      return {
        props: {},
      };
    }
  }

  return {
      props: {},
  };
};
