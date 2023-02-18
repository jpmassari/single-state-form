import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

 const getAPIs = async (req: NextApiRequest, res: NextApiResponse) => {
    const apis = await prisma.aPI.findMany();
    console.log( res.status(200).json({ apis }))
    res.status(200).json({ apis });
};

export default getAPIs;
