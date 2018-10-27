import CityData from '@utils/city'

export const convertAddressData = () => {
  const result = []

  /* eslint-disable */
  for (const p in CityData) {
    const prov = {
      label:    CityData[p].name,
      value:    CityData[p].name,
      children: [],
    }

    if (CityData[p].children && CityData[p].children.length > 0) {
      for (const c in CityData[p].children) {
        const city = {
          label:    CityData[p].children[c].name,
          value:    CityData[p].children[c].name,
          children: [],
        }

        if (CityData[p].children[c].children && CityData[p].children[c].children.length > 0) {
          for (const d in CityData[p].children[c].children) {
            const dist = {
              label: CityData[p].children[c].children[d].name,
              value: CityData[p].children[c].children[d].name,
            }

            city.children.push(dist)
          }
        }

        prov.children.push(city)
      }
    }

    result.push(prov)
  }

  return result
}