create table hospitals (
    id varchar(255) not null primary key,
    name varchar(255),
    short_name varchar(255),
    province varchar(255),
    city varchar(255),
    region varchar(255),
    address varchar(255),
    phone varchar(255),
    flagship boolean,
    lat double precision,
    lng double precision,
    active boolean
);

create table experts (
    id varchar(255) not null primary key,
    display_no varchar(255),
    name varchar(255),
    tier varchar(255),
    hospital_id varchar(255),
    hospital varchar(255),
    dept varchar(255),
    dept_title varchar(255),
    services_json text,
    coverage varchar(255),
    coverage_cities_json text,
    coverage_regions_json text,
    specialty text,
    intro text,
    lead_days integer,
    lead_label varchar(255),
    gender varchar(255),
    photo varchar(255),
    photo_card varchar(255),
    photo_detail varchar(255),
    profile_url varchar(255),
    active boolean,
    region varchar(255)
);

create table institution_accounts (
    phone varchar(255) not null primary key,
    name varchar(255),
    org_name varchar(255),
    org_type varchar(255),
    title varchar(255),
    contact_phone varchar(255),
    email varchar(255),
    province varchar(255),
    city varchar(255),
    active boolean,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone
);

create table admin_accounts (
    username varchar(255) not null primary key,
    password_hash varchar(255),
    name varchar(255),
    phone varchar(255),
    role varchar(255),
    hospital_id varchar(255),
    active boolean,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone
);

create table slots (
    id varchar(255) not null primary key,
    doctor_id varchar(255) not null,
    slot_date date not null,
    capacity integer not null,
    version bigint,
    constraint uk_slot_doctor_date unique (doctor_id, slot_date)
);

create table appointments (
    id varchar(255) not null primary key,
    idempotency_key varchar(255),
    owner_phone varchar(255),
    hospital_id varchar(255),
    service_type varchar(255),
    doctor_id varchar(255),
    doctor_name varchar(255),
    tier varchar(255),
    "date" date,
    province varchar(255),
    city varchar(255),
    address varchar(255),
    venue varchar(255),
    topic text,
    audience text,
    headcount integer,
    note text,
    status varchar(255),
    plan_json text,
    assigned_staff_json text,
    internal_note text,
    feedback text,
    demand_id varchar(255),
    manual_arrangement boolean,
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone,
    accepted_at timestamp(6) with time zone,
    plan_sent_at timestamp(6) with time zone,
    confirmed_at timestamp(6) with time zone,
    cancelled_at timestamp(6) with time zone,
    completed_at timestamp(6) with time zone,
    location_updated_at timestamp(6) with time zone,
    constraint uk_appointment_idempotency_key unique (idempotency_key)
);

create table demands (
    id varchar(255) not null primary key,
    owner_phone varchar(255),
    target_type varchar(255),
    hospital_id varchar(255),
    service_type varchar(255),
    topic text,
    audience text,
    headcount integer,
    preferred_date date,
    province varchar(255),
    city varchar(255),
    status varchar(255),
    note text,
    matched_expert_id varchar(255),
    matched_expert_name varchar(255),
    matched_hospital_id varchar(255),
    matched_date date,
    matched_at timestamp(6) with time zone,
    match_note text,
    converted_appointment_id varchar(255),
    converted_at timestamp(6) with time zone,
    assigned_staff_json varchar(2000),
    created_at timestamp(6) with time zone,
    updated_at timestamp(6) with time zone
);

create index idx_slot_doctor_date on slots (doctor_id, slot_date);
create index idx_appointment_owner on appointments (owner_phone);
create index idx_appointment_hospital on appointments (hospital_id);
create index idx_demand_owner on demands (owner_phone);
create index idx_demand_hospital on demands (hospital_id);
