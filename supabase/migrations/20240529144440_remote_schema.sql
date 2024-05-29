create type "public"."transaction_status" as enum ('in progress', 'completed', 'canceled');

create table "public"."customer" (
    "id" bigint generated by default as identity not null,
    "phone" text not null,
    "notes" text,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "created_by" uuid default auth.uid(),
    "updated_at" timestamp with time zone,
    "updated_by" uuid
);


alter table "public"."customer" enable row level security;

create table "public"."transaction_items" (
    "id" bigint generated by default as identity not null,
    "product_id" bigint not null,
    "quantity" double precision default '0'::double precision,
    "notes" text,
    "transaction_id" bigint not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "created_by" uuid default auth.uid(),
    "updated_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "updated_by" uuid default auth.uid()
);


alter table "public"."transaction_items" enable row level security;

create table "public"."transactions" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "created_by" uuid default auth.uid(),
    "updated_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text),
    "updated_by" uuid default auth.uid(),
    "completed_at" timestamp with time zone,
    "status" transaction_status not null default 'in progress'::transaction_status,
    "customer_id" bigint not null,
    "provider_id" uuid default auth.uid()
);


alter table "public"."transactions" enable row level security;

alter table "public"."products" add column "type" product_type default 'flower'::product_type;

alter table "public"."profiles" add column "phone" text;

CREATE UNIQUE INDEX customer_phone_key ON public.customer USING btree (phone);

CREATE UNIQUE INDEX customer_pkey ON public.customer USING btree (id);

CREATE UNIQUE INDEX transaction_items_pkey ON public.transaction_items USING btree (id);

CREATE UNIQUE INDEX transactions_pkey ON public.transactions USING btree (id);

alter table "public"."customer" add constraint "customer_pkey" PRIMARY KEY using index "customer_pkey";

alter table "public"."transaction_items" add constraint "transaction_items_pkey" PRIMARY KEY using index "transaction_items_pkey";

alter table "public"."transactions" add constraint "transactions_pkey" PRIMARY KEY using index "transactions_pkey";

alter table "public"."customer" add constraint "customer_phone_key" UNIQUE using index "customer_phone_key";

alter table "public"."transaction_items" add constraint "transaction_items_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."transaction_items" validate constraint "transaction_items_product_id_fkey";

alter table "public"."transaction_items" add constraint "transaction_items_transaction_id_fkey" FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."transaction_items" validate constraint "transaction_items_transaction_id_fkey";

alter table "public"."transactions" add constraint "transactions_customer_id_fkey" FOREIGN KEY (customer_id) REFERENCES customer(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."transactions" validate constraint "transactions_customer_id_fkey";

alter table "public"."transactions" add constraint "transactions_provider_fkey" FOREIGN KEY (provider_id) REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."transactions" validate constraint "transactions_provider_fkey";

grant delete on table "public"."customer" to "anon";

grant insert on table "public"."customer" to "anon";

grant references on table "public"."customer" to "anon";

grant select on table "public"."customer" to "anon";

grant trigger on table "public"."customer" to "anon";

grant truncate on table "public"."customer" to "anon";

grant update on table "public"."customer" to "anon";

grant delete on table "public"."customer" to "authenticated";

grant insert on table "public"."customer" to "authenticated";

grant references on table "public"."customer" to "authenticated";

grant select on table "public"."customer" to "authenticated";

grant trigger on table "public"."customer" to "authenticated";

grant truncate on table "public"."customer" to "authenticated";

grant update on table "public"."customer" to "authenticated";

grant delete on table "public"."customer" to "service_role";

grant insert on table "public"."customer" to "service_role";

grant references on table "public"."customer" to "service_role";

grant select on table "public"."customer" to "service_role";

grant trigger on table "public"."customer" to "service_role";

grant truncate on table "public"."customer" to "service_role";

grant update on table "public"."customer" to "service_role";

grant delete on table "public"."transaction_items" to "anon";

grant insert on table "public"."transaction_items" to "anon";

grant references on table "public"."transaction_items" to "anon";

grant select on table "public"."transaction_items" to "anon";

grant trigger on table "public"."transaction_items" to "anon";

grant truncate on table "public"."transaction_items" to "anon";

grant update on table "public"."transaction_items" to "anon";

grant delete on table "public"."transaction_items" to "authenticated";

grant insert on table "public"."transaction_items" to "authenticated";

grant references on table "public"."transaction_items" to "authenticated";

grant select on table "public"."transaction_items" to "authenticated";

grant trigger on table "public"."transaction_items" to "authenticated";

grant truncate on table "public"."transaction_items" to "authenticated";

grant update on table "public"."transaction_items" to "authenticated";

grant delete on table "public"."transaction_items" to "service_role";

grant insert on table "public"."transaction_items" to "service_role";

grant references on table "public"."transaction_items" to "service_role";

grant select on table "public"."transaction_items" to "service_role";

grant trigger on table "public"."transaction_items" to "service_role";

grant truncate on table "public"."transaction_items" to "service_role";

grant update on table "public"."transaction_items" to "service_role";

grant delete on table "public"."transactions" to "anon";

grant insert on table "public"."transactions" to "anon";

grant references on table "public"."transactions" to "anon";

grant select on table "public"."transactions" to "anon";

grant trigger on table "public"."transactions" to "anon";

grant truncate on table "public"."transactions" to "anon";

grant update on table "public"."transactions" to "anon";

grant delete on table "public"."transactions" to "authenticated";

grant insert on table "public"."transactions" to "authenticated";

grant references on table "public"."transactions" to "authenticated";

grant select on table "public"."transactions" to "authenticated";

grant trigger on table "public"."transactions" to "authenticated";

grant truncate on table "public"."transactions" to "authenticated";

grant update on table "public"."transactions" to "authenticated";

grant delete on table "public"."transactions" to "service_role";

grant insert on table "public"."transactions" to "service_role";

grant references on table "public"."transactions" to "service_role";

grant select on table "public"."transactions" to "service_role";

grant trigger on table "public"."transactions" to "service_role";

grant truncate on table "public"."transactions" to "service_role";

grant update on table "public"."transactions" to "service_role";

