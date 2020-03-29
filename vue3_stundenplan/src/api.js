export async function getBerufe() {
  return fetch('https://sandbox.gibm.ch/berufe.php').then(res => res.json())
}

export async function getKlassen(id) {
  return fetch(`https://sandbox.gibm.ch/klassen.php?beruf_id=${id}`).then(res =>
    res.json()
  )
}

export async function getZeitTafel(id, week) {
  await wait()
  return fetch(
    `https://sandbox.gibm.ch/tafel.php?klasse_id=${id}&woche=${week}`
  ).then(res => res.json())
}

async function wait() {
  return new Promise(resolve => setTimeout(() => resolve(), 200))
}

export default {
  getZeitTafel,
  getBerufe,
  getKlassen,
}
