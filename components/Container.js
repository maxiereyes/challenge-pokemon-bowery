import Head from "next/head";

const Container = ({ children }) => {
  return (
    <div className="container-fluid p-4">
      <Head>
        <title>Challenge Pokemon</title>
      </Head>
      <div className="row justify-content-center text-center">{children}</div>
    </div>
  );
};

export default Container;
