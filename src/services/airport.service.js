import { map, flatMap, skip, take, toArray } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { getLocalJsonData } from './api';

const findAll = () => {
  return getLocalJsonData('data/airport.json').then((r) => {
    return r.json();
  });
}

const filterAirportData = (term = '', pageIndex = 0, pageSize = 10, airportData) => {
  const skipRecords = (pageIndex * pageSize);
  let result = of(airportData);
  let source = result.pipe(
    flatMap((response) => from(response.filter((item) => {
      return (item.name.toLowerCase().includes(term.toLowerCase())
        || item.city.toLowerCase().includes(term.toLowerCase())
        || item.country.toLowerCase().includes(term.toLowerCase()));
    }
    ))),
    map((res) => {
      return res;
    }),
    skip(skipRecords),
    take(pageSize),
    toArray()
  );
  return source;
}

const findTotalRecords = (response, term) =>{
  const result = response.filter((item) => {
    return (item.name.toLowerCase().includes(term.toLowerCase())
      || item.city.toLowerCase().includes(term.toLowerCase())
      || item.country.toLowerCase().includes(term.toLowerCase()))
  });
  return result.length;
}
export {
  findAll,
  filterAirportData,
  findTotalRecords
}