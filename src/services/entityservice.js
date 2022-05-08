export default class EntityService {
  static async getData(entity, page) {
    try {
      let data = await fetch(`https://swapi.dev/api/${entity}?page=${page}`);
      data = await data.json(data);
      return data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
  static async getDatum(url) {
    try {
      let datum = await fetch(`${url}`);
      datum = await datum.json(datum);
      return datum;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
