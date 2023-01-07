export const parseRowDataPacket = (obj) => {
    return Object.values(JSON.parse(JSON.stringify(obj)));
  }