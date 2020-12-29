import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).end("unauthorized");
  const id = req.query.id as string;

  if (id) {
    if (typeof id === "object")
      return res.status(400).end("invalid query parameter");
    if (!parseInt(id)) {
      return res.status(400).end("invalid query parameter");
    }
  }

  if (req.method === "GET") {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });
    return res.status(200).json(post);
  }

  if (req.method === "POST") {
    const { title, body, userId } = JSON.parse(req.body) as {
      title: string;
      body: string;
      userId: number;
    };
    if (userId != session.user.id) return res.status(401).end("unauthorized");

    const updated = await prisma.post.update({
      data: { title, body },
      where: { id: parseInt(id) },
    });
    res.status(200).json(updated);
  }
};
