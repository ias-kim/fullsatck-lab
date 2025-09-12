
-- 휴강 보강 이벤트 알림
insert into course_event (event_id, schedule_id, event_type, event_date)
values ('EVT00101', 'G1-MON-01', 'CANCEL', '2025-10-02')
    on duplicate key update event_type=values(event_type), event_date=values(event_date);

insert ignore into notification_delivery_event (user_id, event_id, message_id, status)
select distinct csu.user_id, 'EVT00101', CONCAT('MSG-E', uuid_short()), 'sent'
from course_schedule cs
         join course_student csu on csu.course_id = cs.course_id
where cs.schedule_id = 'G1-MON-01';

select ua.name, nde.status, nde.read_at
from notification_delivery_event nde
         join user_account ua on ua.user_id = nde.user_id
where nde.event_id = 'EVT00101';

update notification_delivery_event
set read_at=now()
where event_id='EVT00101' and user_id=@john_id;

select
    sum(read_at is null) as unread_count,
    sum(read_at is not null) as read_count
from notification_delivery_event
where event_id = 'EVT00101';
;