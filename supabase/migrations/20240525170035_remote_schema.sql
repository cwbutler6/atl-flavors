revoke delete on table "auth"."one_time_tokens" from "dashboard_user";

revoke insert on table "auth"."one_time_tokens" from "dashboard_user";

revoke references on table "auth"."one_time_tokens" from "dashboard_user";

revoke select on table "auth"."one_time_tokens" from "dashboard_user";

revoke trigger on table "auth"."one_time_tokens" from "dashboard_user";

revoke truncate on table "auth"."one_time_tokens" from "dashboard_user";

revoke update on table "auth"."one_time_tokens" from "dashboard_user";

revoke delete on table "auth"."one_time_tokens" from "postgres";

revoke insert on table "auth"."one_time_tokens" from "postgres";

revoke references on table "auth"."one_time_tokens" from "postgres";

revoke select on table "auth"."one_time_tokens" from "postgres";

revoke trigger on table "auth"."one_time_tokens" from "postgres";

revoke truncate on table "auth"."one_time_tokens" from "postgres";

revoke update on table "auth"."one_time_tokens" from "postgres";

alter table "auth"."one_time_tokens" drop constraint "one_time_tokens_token_hash_check";

alter table "auth"."one_time_tokens" drop constraint "one_time_tokens_user_id_fkey";

alter table "auth"."one_time_tokens" drop constraint "one_time_tokens_pkey";

drop index if exists "auth"."one_time_tokens_pkey";

drop index if exists "auth"."one_time_tokens_relates_to_hash_idx";

drop index if exists "auth"."one_time_tokens_token_hash_hash_idx";

drop index if exists "auth"."one_time_tokens_user_id_token_type_key";

drop table "auth"."one_time_tokens";

drop type "auth"."one_time_token_type";

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();


create policy "Anyone can upload an avatar."
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'avatars'::text));


create policy "Avatar images are publicly accessible."
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'avatars'::text));



