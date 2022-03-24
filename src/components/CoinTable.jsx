import { useState } from "react";
import Link from "next/link";
import FlatList from "flatlist-react";

const CoinTable = ({ coins }) => {
  const [limit, setLimit] = useState(20);

  const renderCoin = (coin, idx) => {
    return (
      <tr className="coin_row" key={coin.asset_id}>
        <td>
          <Link href={`/coin/${coin.asset_id}`}>
            <a>{coin.asset_id}</a>
          </Link>
        </td>
        <td>
          <Link href={`/coin/${coin.asset_id}`}>
            <a>{coin.name}</a>
          </Link>
        </td>
        <td>
          <Link href={`/coin/${coin.asset_id}`}>
            <a>{coin.price_usd}</a>
          </Link>
        </td>
      </tr>
    );
  };

  const loadMore = () => {
    let newLimit = limit + 20;
    if (newLimit > coins.length) newLimit = coins.length;
    setLimit(newLimit);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <FlatList limit={limit} paginate list={coins} renderItem={renderCoin} renderOnScroll />
      </tbody>
      <button onClick={loadMore}>Load More</button>
    </table>
  );
};

export default CoinTable;
