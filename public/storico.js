search();

async function search() {
  const res = await fetch('/storico');
  const data = await res.json();

  for (item of data) {
    const root = document.createElement('p');
    const name = document.createElement('div');
    // const geo = document.createElement('div');
    // const date = document.createElement('div');

    name.textContent = `name: ${item.name}`;
    // geo.textContent = `${item.lat}°, ${item.lon}°`;
    // const dateString = new Date(item.timestamp).toLocaleString();
    // date.textContent = dateString;

    root.append(name);
    document.body.append(root);
  }
  console.log(data);
}