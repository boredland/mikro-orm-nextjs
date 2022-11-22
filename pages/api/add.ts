import { NextApiHandler } from 'next/dist/shared/lib/utils';
import 'reflect-metadata';
import { User } from "../../entities/User";
import getEM from '../../utils/getEM';
import withORM from '../../utils/withORM';

const handler: NextApiHandler = async (req, res) => {
  const em = getEM();

  console.log(`context-specific em-ID: ${em.id}`);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  
  const userToPersist = em.create(User,new User());
  userToPersist.field = { value: "works" };
  await em.persistAndFlush(userToPersist);
  const queryPersisted = await em.findOne(User, { field: { value: "works"} });
  console.log("found", queryPersisted)

  const userToUpsert = em.create(User, new User());
  userToUpsert.field = { value: "doesnt"};
  await em.upsert(userToUpsert);
  const queryUpserted = await em.findOne(User, { field: { value: "doesnt"} });
  console.log("not found", queryUpserted)

  res.end(JSON.stringify(userToPersist));
};

export default withORM(handler);
