export async function getBerufe() {
  try {
    return await fetch('https://sandbox.gibm.ch/berufe.php').then(res =>
      res.json()
    )
  } catch (err) {
    throw err
  }
}

export async function getKlassen(id) {
  try {
    return await fetch(
      `https://sandbox.gibm.ch/klassen.php?beruf_id=${id}`
    ).then(res => res.json())
  } catch (err) {
    throw err
  }
}

export async function getZeitTafel(id) {
  await wait()
  try {
    return await fetch(
      `https://sandbox.gibm.ch/tafel.php?klasse_id=${id}`
    ).then(res => res.json())
  } catch (err) {
    throw err
  }
}

async function wait() {
  return new Promise(resolve => {
    setTimeout(() => resolve(), 300)
  })
}

export default {
  getZeitTafel,
  getBerufe,
  getKlassen,
}
