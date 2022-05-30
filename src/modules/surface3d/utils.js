const np = {
  power: (v1, v2) => v1 ** v2,
  float_power: (v1, v2) => v1 ** v2,
  logspace: () => 1,
}

function makeSomeMagic(d1h1, r1, r2, C1h1, gamma21, C2h2, gamma12, alpha12, d2, h2, alpha21, d1, h1, d2h2) {
  return d1h1 * r1 * r2 * np.power((r1 * C1h1), gamma21) * C2h2 + d1h1 * r1 * r2 * np.power((r2 * C2h2), gamma12) * C2h2 + d1h1 * r1 * np.power(r2, (gamma12 + 1)) * np.power(alpha12 * d2, gamma12 * h2) * C2h2 + d1h1 * r1 * np.power(r2, gamma12) * np.power(alpha12 * d2, gamma12 * h2) * np.power((r1 * C1h1), gamma21) + d1h1 * np.power(r1, (gamma21 + 1)) * np.power(r2, gamma12) * np.power(alpha21 * d1, gamma21 * h1) * np.power(alpha12 * d2, gamma12 * h2) + d1h1 * np.power(r1, (gamma21 + 1)) * np.power(alpha21 * d1, gamma21 * h1) * np.power((r2 * C2h2), gamma12) + d2h2 * r1 * r2 * np.power((r1 * C1h1), gamma21) * C1h1 + d2h2 * r1 * r2 * np.power((r2 * C2h2), gamma12) * C1h1 + d2h2 * np.power(r1, (gamma21 + 1)) * r2 * np.power(alpha21 * d1, gamma21 * h1) * C1h1 + d2h2 * np.power(r1, gamma21) * r2 * np.power(alpha21 * d1, gamma21 * h1) * np.power((r2 * C2h2), gamma12) + d2h2 * np.power(r1, gamma21) * np.power(r2, (gamma12 + 1)) * np.power(alpha21 * d1, gamma21 * h1) * np.power(alpha12 * d2, gamma12 * h2) + d2h2 * np.power(r2, (gamma12 + 1)) * np.power(alpha12 * d2, gamma12 * h2) * np.power((r1 * C1h1), gamma21) + r1 * r2 * np.power((r1 * C1h1), gamma21) * C1h1 * C2h2 + r1 * r2 * np.power((r2 * C2h2), gamma12) * C1h1 * C2h2 + np.power(r1, (gamma21 + 1)) * np.power(alpha21 * d1, gamma21 * h1) * np.power((r2 * C2h2), gamma12) * C1h1 + np.power(r2, (gamma12 + 1)) * np.power(alpha12 * d2, gamma12 * h2) * np.power((r1 * C1h1), gamma21) * C2h2;
}

const _MuSyC_E = (d1, d2, E0, E1, E2, E3, h1, h2, C1, C2, alpha12, alpha21, gamma12, gamma21) => {
  const d1h1 = np.power(d1, h1)
  const d2h2 = np.power(d2, h2)
  const C1h1 = np.power(C1, h1)
  const C2h2 = np.power(C2, h2)
  const r1 = 100 / C1h1
  const r2 = 100 / C2h2
  const U = (r1 * r2 * np.power((r1 * C1h1), gamma21) * C1h1 * C2h2 + r1 * r2 * np.power((r2 * C2h2), gamma12) * C1h1 * C2h2 + np.power(r1, (gamma21 + 1)) * np.power(alpha21 * d1, gamma21 * h1) * np.power((r2 * C2h2), gamma12) * C1h1 + np.power(r2, (gamma12 + 1)) * np.power(alpha12 * d2, gamma12 * h2) * np.power((r1 * C1h1), gamma21) * C2h2) / makeSomeMagic(d1h1, r1, r2, C1h1, gamma21, C2h2, gamma12, alpha12, d2, h2, alpha21, d1, h1, d2h2)
  const A1 = (d1h1 * r1 * r2 * np.power((r1 * C1h1), gamma21) * C2h2 + d1h1 * r1 * r2 * np.power((r2 * C2h2), gamma12) * C2h2 + d1h1 * np.power(r1, (gamma21 + 1)) * np.power(alpha21 * d1, gamma21 * h1) * np.power((r2 * C2h2), gamma12) + d2h2 * np.power(r1, gamma21) * r2 * np.power(alpha21 * d1, gamma21 * h1) * np.power((r2 * C2h2), gamma12)) / makeSomeMagic(d1h1, r1, r2, C1h1, gamma21, C2h2, gamma12, alpha12, d2, h2, alpha21, d1, h1, d2h2)
  const A2 = (d1h1 * r1 * np.power(r2, gamma12) * np.power(alpha12 * d2, gamma12 * h2) * np.power((r1 * C1h1), gamma21) + d2h2 * r1 * r2 * np.power((r1 * C1h1), gamma21) * C1h1 + d2h2 * r1 * r2 * np.power((r2 * C2h2), gamma12) * C1h1 + d2h2 * np.power(r2, (gamma12 + 1)) * np.power(alpha12 * d2, gamma12 * h2) * np.power((r1 * C1h1), gamma21)) / makeSomeMagic(d1h1, r1, r2, C1h1, gamma21, C2h2, gamma12, alpha12, d2, h2, alpha21, d1, h1, d2h2)
  return U * E0 + A1 * E1 + A2 * E2 + (1 - (U + A1 + A2)) * E3
}

const _get_E3 = (E0, E1, E2, beta) => {
  const minE = Math.min(E1, E2)
  return minE - beta*(E0-minE)
}

const get_parameters = (params) => {
  let alpha12 = np.power(10., params.alpha12)
  let alpha21 = np.power(10., params.alpha21)
  const gamma12 = np.power(10., params.gamma12)
  const gamma21 = np.power(10., params.gamma21)
  if (alpha12===np.power(10., -3)) alpha12=0
  if (alpha21===np.power(10., -3)) alpha21=0
  const beta = params.beta

  const E1 = params.E1
  const E2 = params.E2
  const E0 = params.E0
  const C1 = np.power(10., params.C1)
  const C2 = np.power(10., params.C2)
  const h1 = np.power(10., params.h1)
  const h2 = np.power(10., params.h2)
  const E3 = _get_E3(E0, E1, E2, beta)

  let d1 = np.logspace(-3,3,30)
  let d2 = np.logspace(-3,3,30)
  /*d1 = np.hstack([[0],d1])
  d2 = np.hstack([[0],d2])
  d1,d2 = np.meshgrid(d1, d2)
  d1 = d1.flatten()
  d2 = d2.flatten()*/

  return { E0, E1, E2, E3, h1, h2, C1, C2, alpha12, alpha21, gamma12, gamma21, d1, d2 };
}
export const Utils = {
  get_parameters,
  _MuSyC_E
}
