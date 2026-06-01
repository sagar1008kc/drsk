-- Prevent authenticated users from escalating their own profile role.
-- Admin role changes should be made only through trusted service-role SQL/API.

create or replace function public.prevent_profile_role_self_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() = old.id and new.role is distinct from old.role then
    raise exception 'Profile role cannot be changed by the profile owner';
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_prevent_role_self_update on public.profiles;
create trigger profiles_prevent_role_self_update
  before update on public.profiles
  for each row
  execute procedure public.prevent_profile_role_self_update();
