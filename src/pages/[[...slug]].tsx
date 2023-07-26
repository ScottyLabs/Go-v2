import { GetServerSideProps } from "next";
import client from "server/db/client";

export default function Page() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.resolvedUrl);

  const route = await client.route.findFirst({
    where: { path: context.resolvedUrl },
  });

  if (!route) {
    return { notFound: true };
  }

  await client.route.update({
    where: { id: route.id },
    data: { hits: route.hits + 1 },
  });

  return { redirect: { destination: route.location, permanent: false } };
};
