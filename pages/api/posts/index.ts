import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).end("unauthorized");

  if (req.query.uid) {
    if (typeof req.query.uid === "object")
      return res.status(400).end("invalid query parameter");
    if (!parseInt(req.query.uid))
      return res.status(400).end("invalid query parameter");
  }

  if (req.method === "GET") {
    const where: Prisma.PostWhereInput = {};
    if (req.query.uid) {
      where.userId = parseInt(req.query.uid as string);
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const userId = session.user.id;
    const { id, title, body } = JSON.parse(req.body) as {
      id?: number;
      title: string;
      body: string;
    };

    if (id) {
      const updated = await prisma.post.update({
        data: { title, body },
        where: { id },
      });
      res.status(201).json(updated);
    } else {
      const created = await prisma.post.create({
        data: { title, body, User: { connect: { id: userId } } },
      });
      res.status(201).json(created);
    }
  }
};
