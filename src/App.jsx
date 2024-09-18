import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import './input.css';

function App() {
  const [user, setUser] = useState([]);
  const [htmlContent, setHtmlContent] = useState('');

  const [search, setSearch] = useState('');
  function getUser(localizer) {
    const options = {
      method: 'GET',
    };

    fetch(
      `https://api.checkout.prodigioeducacao.com/events/${localizer}?email=leonardo.melo@proenem.com.br&password=Promilitares@123`,
      options
    )
      .then((response) => response.text(response))
      .then((response) => setHtmlContent(response))
      .catch((err) => console.error(err));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await getUser(search);
  };

  return (
    <>
      <p className="read-the-docs">Coloque o número do pedido abaixo</p>
      <form
        onSubmit={handleSubmit}
        className=" mb-8 w-auto flex flex-row gap-2 justify-center items-center"
      >
        <label className="flex flex-row gap-1 ">
          Número do pedido
          <input
            className="border border-white px-1 rounded bg-slate-700 w-[200px] h-8"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          name="Procurar"
        >
          Procurar
        </button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}>
        {/* {user.map((client) => (
          <div key={client} className="">
            <p className=" w-fit border border-white px-1">{client}</p>
          </div>
        ))} */}
      </div>
    </>
  );
}

export default App;
