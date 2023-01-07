import { BACKEND_PORT, BACKEND_URL } from "./constants"

export const fetchGateListService = async () => {
    const options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
      const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/gate/list`, options);
      const status = response.status;
      const data = await response.json();
      return { status, data };
}

export const fetchGateListForTerminalService = async (terminal) => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/gate/list/terminal?terminal_number=${terminal}`, options);
  const status = response.status;
  const data = await response.json();
  return { status, data };
}


export const addGateService = async (gate) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gate)
  }
  const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/gate/new`, options);
  const status = response.status;
  const data = await response.json();
  return {status, data};
}