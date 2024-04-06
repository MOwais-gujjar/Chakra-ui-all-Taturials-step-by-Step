"use client";

import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const createMeeting = () =>{

  }
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
        HandleClick={() => setMeetingState('isJoiningMeeting')}
        className=" bg-yellow-400"
      />
      <MeetingModel
      isOpen={meetingState === 'isInstantMeeting'}
      isClose={() => setMeetingState(undefined)}
      title={"Start an Instant Meeting"}
      className='text-center'
      buttonText="Start Meeting"
      HandleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
