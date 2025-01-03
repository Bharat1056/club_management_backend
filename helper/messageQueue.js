import { delay, Queue, Worker } from "bullmq";
import redis from "../utils/redis.js";
import sendEmailViaResend from "./emailSend.js";
import axios from "axios";

const emailQueue = new Queue("emailQueue", { connection: redis });
const apiQueue = new Queue("apiQueue", { connection: redis });

const queueOption = {
  removeOnComplete: true,
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 5000,
  },
  removeOnFail: false,
};

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    if (job.name === "verification-email") {
      try {
        const { to, subject } = job.data;
        await sendEmailViaResend([to], subject);
      } catch (error) {
        console.log(`Email sending failed: ${error}`);
        throw new Error("Email send failed");
      }
    }
  },
  { connection: redis }
);

const apiTriggerWorker = new Worker(
  "apiQueue",
  async (job) => {
    if (job.name === "delete-unverify-user") {
      try {
        const { api } = job.data;
        await axios.delete(api);
      } catch (error) {
        console.log(`API trigger failed: ${error}`);
        throw new Error("API trigger failed");
      }
    }
  },
  { connection: redis }
);

export const emailSendViaQueue = async (to, subject) => {
  const job = await emailQueue.add(
    "verification-email",
    { to, subject },
    queueOption
  );
};

export const apiTriggerViaQueue = async (api) => {
  const job = await apiQueue.add(
    "delete-unverify-user",
    { api },
    { ...queueOption, delay: 86400000 }
  );
};
