alter table appointments add column idempotency_fingerprint varchar(64);
alter table appointments add column version bigint not null default 0;
