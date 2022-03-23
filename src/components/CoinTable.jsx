import Link from "next/link";

const CoinTable = ({ coins }) => {
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
        {coins.map((coin, index) =>
          coin.type_is_crypto || index > 10 ? (
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
          ) : null
        )}
      </tbody>
    </table>
  );
};

export default CoinTable;
