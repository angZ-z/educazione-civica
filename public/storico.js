getData();

async function getData() {
  const res = await fetch('/storico');
  const data = await res.json();
  console.log(res.json())

  for (item of data) {
    const root = document.createElement('p');
    const name = document.createElement('div');

    name.textContent = `name: ${item.name}`;
    root.append(name);
    document.body.append(root);
  }
  console.log(data);
}