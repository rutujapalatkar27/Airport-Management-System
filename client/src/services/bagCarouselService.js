import { BACKEND_PORT, BACKEND_URL } from "./constants"

export const fetchBagCarouselListService = async () => {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/baggage/list`, options);
      const status = response.status;
      const data = await response.json();
      return { status, data };
}

export const fetchAvailableBagCarouselListService = async () => {
  const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/baggage/list/available`, options);
    const status = response.status;
    const data = await response.json();
    return { status, data };
}

export const fetchAssignedBagCarouselListService = async () => {
  const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/baggage/list/assigned`, options);
    const status = response.status;
    const data = await response.json();
    return { status, data };
}
// export const fetchGateListForTerminalService = async (terminal) => {
//   const options = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//   }
//   const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/gate/list/terminal?terminal_number=${terminal}`, options);
//   const status = response.status;
//   const data = await response.json();
//   return { status, data };
// }


export const addBagCarouselService = async (BagCarousel) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(BagCarousel)
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/baggage/new`, options);
  const status = response.status;
  const data = await response.json();
  return {status, data};
}