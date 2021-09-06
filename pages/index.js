import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { CardItem } from "../components/CardItem";
import { Container } from "../components/Container";
import { CustomError } from "../components/Error";
import { Pagination } from "../components/Pagination";
import { Search } from "../components/Search";
import { getAllPokemon } from "../services/pokeapi";

export default function Home({ pokemon, next, prev }) {
  const router = useRouter();
  const [session, loading] = useSession();
  const [data, setData] = useState({
    pokemon,
    next,
    prev,
  });
  const [error, setError] = useState("");
  const [filterData, setFilterData] = useState({
    pokemon,
    next,
    prev,
  });

  if (loading) return null;

  if (!loading && !session) {
    router.push({
      pathname: "/login",
    });
  }

  const getData = async (offset, limit) => {
    try {
      const data = await getAllPokemon(offset, limit);
      setData({
        pokemon: data.results,
        next: data.next,
        prev: data.previous,
      });
      setFilterData({
        pokemon: data.results,
        next: data.next,
        prev: data.previous,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const getPrevOrNextData = async (url) => {
    if (url) {
      const queryParams = url.split("?")[1];
      const params = new URLSearchParams(queryParams);
      const offset = params.get("offset");
      const limit = params.get("limit");
      await getData(offset, limit);
    }
  };

  const handleChange = ({ target: { value } }) => {
    if (value.length > 2) {
      const newFilterData = data.pokemon.filter((item) =>
        item.name.includes(value)
      );
      setFilterData({
        pokemon: newFilterData,
      });
    } else {
      setFilterData(data);
    }
  };

  if (error) {
    return <CustomError message={error} />;
  }

  return (
    <div>
      {!loading && session && (
        <Container>
          <Search action={handleChange} />
          {!filterData.pokemon.length ? (
            <h1>Not found data</h1>
          ) : (
            <div className="d-flex flex-wrap justify-content-evenly">
              {filterData.pokemon.map((item, index) => (
                <CardItem key={index} name={item.name} url={item.url} />
              ))}
            </div>
          )}
          <Pagination
            next={data.next}
            prev={data.prev}
            action={getPrevOrNextData}
          />
        </Container>
      )}
    </div>
  );
}

export async function getStaticProps(context) {
  const getDataStaticProps = async () => {
    try {
      const data = await getAllPokemon(0, 20);

      return {
        pokemon: data.results,
        next: data.next,
        prev: data.previous,
      };
    } catch (error) {
      return {
        pokemon: [],
        next: null,
        prev: null,
      };
    }
  };

  const propsData = await getDataStaticProps();

  return {
    props: {
      ...propsData,
    },
  };
}
