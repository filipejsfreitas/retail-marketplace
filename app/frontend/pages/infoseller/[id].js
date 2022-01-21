import Layout from "../../components/Layout";
import fetchCategories, {
  revalidateTime,
} from "helper/DynamicCategoriesHelper";
import Info from "components/InfoSeller/Info";
import Proposals from "components/InfoSeller/Proposals";
import Proposal from "components/InfoSeller/Proposal";
import useFetchData from "hooks/useFetchData";
import { useRouter } from "next/router";
import useToken from "hooks/useToken";

export async function getStaticPaths() {
  const data = [];

  const paths = data.map((post) => ({
    params: { id: post._id },
  }));

  return { paths, fallback: "blocking" };
}

const SellerInfo = ({ idSeller, token, proposals }) => {
  const { data: seller, loading } = useFetchData(
    `${process.env.NEXT_PUBLIC_HOST}/seller/${idSeller}`
  );
  return loading ? <></> : <Info seller={seller} token={token} proposals={proposals}/>;
};

const GetProposals = ({ proposals, token }) => {
  const info = [];
  proposals.map((prop) => {
    const { data: product, loading } = useFetchData(
      `${process.env.NEXT_PUBLIC_HOST}/product/${prop.product_id}`
    );
    loading ? <></> : info.push(<Proposal prod={product} prop={prop} token={token}/>);
  });
  return info;
};

export default function SellerPage({ categories }) {
  const route = useRouter();
  const { token } = useToken();
  const idSeller = route.query.id;
  const { data: proposals, loading } = useFetchData(
    `${process.env.NEXT_PUBLIC_HOST}/proposal/seller/${idSeller}`,
    { default: {} }
  );
  return (
    <Layout categories={categories}>
      {loading ? (
        <></>
      ) : (
        <div>
          <SellerInfo idSeller={idSeller} token={token} proposals={proposals.length} />
          <Proposals info={<GetProposals proposals={proposals} token={token}/>} />
        </div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await fetchCategories();
  const revTime = revalidateTime();

  return {
    props: {
      categories,
    },

    revalidate: revTime,
  };
}
