import { chakra } from "@chakra-ui/react";
import Article from "../components/Article";
import Header from "../components/Header";

const Home: React.FC = (props) => {
  return (
    <>
      <Header mb="1rem" />
      <chakra.div maxW="1230px" padding="0 30px" margin="0 auto">
        <main>
          <ul>
            <chakra.li mb="2rem">
              <Article />
            </chakra.li>
            <chakra.li>
              <Article />
            </chakra.li>
          </ul>
        </main>
      </chakra.div>
    </>
  );
};

export default Home;
