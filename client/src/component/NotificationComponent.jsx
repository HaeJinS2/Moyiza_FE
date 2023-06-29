import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getAPI, postAPI } from "../axios";
import { sseAlarmState } from "../states/sseAlarmState";

const NotificationComponent = () => {
  const navigate = useNavigate();
  const [eventSource, setEventSource] = useState(null);
  const [sseAlarm, setSseAlarm] = useRecoilState(sseAlarmState);
  useEffect(() => {
    // SSE 구독을 위한 요청을 서버에 보내고 EventSource를 생성합니다.
    const subscribeToNotifications = () => {
      getAPI("/alert/alerts")
        .then((res) => {
          console.log("알람목록", res);
          const alarmLists = res.data.filter((item) => item.checking === false);
          const newEventSource = new EventSource(res.data.url);
          setEventSource(newEventSource);
          setSseAlarm(alarmLists);
        })
        .catch((error) =>
          console.error("Error subscribing to notifications:", error)
        );
    };

    subscribeToNotifications();

    return () => {
      // 컴포넌트 언마운트 시 SSE 연결을 종료합니다.
      if (eventSource) {
        eventSource.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!eventSource) return;

    // SSE 이벤트 핸들러 등록
    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      // 알림을 받았을 때 원하는 동작을 수행합니다.
      console.log("Received notification:", eventData);
    };

    eventSource.onerror = () => {
      console.error("Error occurred with SSE connection.");
    };
  }, [eventSource]);

  return (
    <>
      <div
        className={`flex flex-col items-start  w-full h-[370px] overflow-auto relative`}
      >
        <div className="flex justify-between border-b-[2px] h-[56px] w-full text-[24px] font-semibold items-center px-4 mb-2">
          <div>알림</div>
          <div>X</div>
        </div>
        {sseAlarm.length === 0 ? (
          <div className="flex justify-center items-center w-full h-full">
            <div className="text-[24px]">등록된 알림이 없습니다.</div>
          </div>
        ) : (
          sseAlarm?.map((alarm) => {
            return (
              <div
                className="h-[72px] w-full flex gap-2 items-center justify-between p-2"
                onClick={() => {
                  navigate(`/oneday/${alarm.oneDayId}`);
                  postAPI(`/alert/${alarm.id}`, {}).then((res) => {
                    getAPI("/alert/alerts")
                      .then((res) => {
                        console.log("알람목록", res);
                        const alarmLists = res.data.filter(
                          (item) => item.checking === false
                        );
                        setSseAlarm(alarmLists);
                      })
                      .catch((error) =>
                        console.error("Error fetching alarms:", error)
                      );
                  });
                }}
              >
                <div>
                  <div>
                    <img
                      className="rounded-full h-[56px] w-[56px] object-contain"
                      alt="user_profile"
                      src={alarm.imageUrl}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-between w-full">
                  <div>{alarm.oneDayTitle}</div>
                  <div> {alarm.message}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default NotificationComponent;
