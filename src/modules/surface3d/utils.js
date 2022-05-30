const np = {
  power: (v1, v2) => v1 ** v2,
  float_power: (v1, v2) => v1 ** v2,

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

const _get_beta = (E0, E1, E2, E3) => {
  const minE = Math.min(E1, E2)
  return (minE-E3)/(E0-minE)
}

const _get_E3 = (E0, E1, E2, beta) => {
  const minE = Math.min(E1, E2)
  return minE - beta*(E0-minE)
}

const _hill_inv = (E, E0, Emax, h, C) => {
  const E_ratio = (E-E0)/(Emax-E)
  const d = np.float_power(E_ratio, 1./h)*C
  d[E_ratio<0] = np.nan
  return d
}

const _hill_E = (d, E0, Emax, h, C) => {
  const dh = np.power(d,h)
  return E0 + (Emax-E0)*dh/(np.power(C,h)+dh);
}

const _bliss = (d1, d2, E, E0, E1, E2, h1, h2, C1, C2) => {
  const E1_alone = _hill_E(d1, E0, E1, h1, C1)
  const E2_alone = _hill_E(d2, E0, E2, h2, C2)
  const synergy = E1_alone*E2_alone - E
  synergy[(d1===0) | (d2===0)] = 0
  return synergy
}
