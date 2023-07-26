import { GetServerSideProps } from "next";
import client from "server/db/client";

export default function Page({ notFound }: { notFound: boolean }) {
  if (notFound) {
    return <div>Not found</div>;
  }

  return <div>Redirecting...</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.resolvedUrl);

  const route = await client.route.findFirst({
    where: { path: context.resolvedUrl },
  });

  if (!route) {
    return { props: { notFound: true } };
  }

  await client.route.update({
    where: { id: route.id },
    data: { hits: route.hits + 1 },
  });

  return { redirect: { destination: route.location, permanent: false } };
};
