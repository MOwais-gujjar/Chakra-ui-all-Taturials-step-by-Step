"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";

const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    DateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();
  const createMeeting = async () => {
    if (!user || !client) return;
    try {
      if(!values.DateTime){
        toast({
          title: "Please Select a Date and Time",
        })
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create Call");

      const startsAt =
        values.DateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
        toast({
          title: "Meeting Created",
        })
      
    } catch (error) {
      console.log(error);
        toast({
          title: "Failed to create Meeting",
        })
      
    }
  };
  return (
    <section className=" grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an Instant Meeting"
        HandleClick={() => setMeetingState("isInstantMeeting")}
        className=" bg-orange-400"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan Your Meeting"
        HandleClick={() => setMeetingState("isScheduleMeeting")}
        className=" bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your Recordings"
        HandleClick={() => router.push("/recordings")}
        className=" bg-purple-400"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Via Invitation Link"
        HandleClick={() => setMeetingState("isJoiningMeeting")}
        className=" bg-yellow-400"
      />
      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        isClose={() => setMeetingState(undefined)}
        title={"Start an Instant Meeting"}
        className="text-center"
        buttonText="Start Meeting"
        HandleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
