/**Reset user sign-in Password queries
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Get old password from user table and update new added password in user table.
 */
const resetQueries = {
  get_pass: `select password from "user" where "id"= :id;`,
  reset_pass: `UPDATE public."user" SET "password"= :encryptPassword where "id"= :id;`,
};

/**forgot Password queries
 * @author: JD9898 <jaydeep.malaviya@dataprophets.in>
 * @description: Forgot Password query for send mail , get OTP, verify OTP, get email , forgot password link, new password
 */
const forgetQueries = {
  forgot: `SELECT "email" from public."user" where "email"= :email`,
  getOtp: `INSERT INTO "otp"("email","otp","expire_time") VALUES (:email,:otpGenerated,:expire_time);`,
  resendOtp: `UPDATE public."otp" SET  "otp"=:otpGenerated,"is_verified"= :is_verified,"expire_time" = :expire_time where "email"= :email`,
  Otp: `SELECT "otp", "is_verified" ,"expire_time" from public."otp" where "otp"= :verifyOtp and "email" = :email order by "createdAt" desc limit 1 ;`,
  Email: `SELECT "email" from public."commomn" where "uuid"= :uuid`,
  Verified: `UPDATE public."otp" SET is_verified= :is_verified WHERE "otp" = :verifyOtp;`,
  forgot_pass: `SELECT "email" from public."user" where "email"= :email;`,
  new_pass: `UPDATE public."user" SET "password"= :encryptPassword where "email"= :email`,
  verify_link: `UPDATE public."reset_password_url" SET is_called= :is_called WHERE "reset_password_url" = :verifyLink;`,
  getLink: `SELECT "reset_password_url", "expire_time" from public."reset_password_url" where "reset_password_url"= :verifyLink and "is_called" = :is_called;`,
  InsertLink: `INSERT INTO "reset_password_url"("email","reset_password_url","expire_time") VALUES (:email, :link, :expire_time);`,
};
/**users Related queries
 * @author:  JD9898<jaydeep.malaviya@dataprophets.in>
 * @description: Get user profile details using select query, update users details using update query & view family member list in user profile using select query.
 */
const userQueries = {
  get_user: `SELECT id, uuid, name, email, phone, profile_url as "profileUrl"
  FROM public."user" 
  WHERE "id"= :id;`,
  user_update: `UPDATE public."user" SET "profile_url" = :files WHERE "id"= :id;`,
  update_user_with_image: `UPDATE public."user"
	SET name=:name, phone=:phone, profile_url = :profile where "id"= :userId;`,
  update_user: `UPDATE public."user"
	SET name=:name, phone=:phone where "id"= :userId;`,
  view_family: `SELECT relation.relation, user.first_name, user.middle_name, user.last_name, user.user_unique_id FROM public."user_relation" as relation INNER JOIN public."user" as user ON relation.family_member_id = user.user_unique_id where relation.user_id= :user_id 
  ORDER BY user_id DESC
  limit :page_size OFFSET :page_no;`,
  select_user_uuid: `select "uuid" from public."user" where "user_unique_id"= :userId; `,
  link_family: `INSERT INTO public."user_relation"(uuid, relation, "user_id", "family_member_id", created_by, updated_by)
        VALUES (:relation, :user_id, :family_id, :created_by, :updated_by); `,
  update_family: `UPDATE public."user_relation" SET "relation" = :relation where "user_id" = :user_id and "family_member_id" = :family_id;`,
  find_linked_family_member: `select * from public."user_relation" where "relation"=:relation and "user_id"=:user_id and "family_member_id" = :family_id;`,
  find_family_member: `select "user_unique_id", "first_name", "middle_name", "last_name" from "user" where LOWER("user_unique_id") = LOWER(:user_unique_id) ;`,
  find_last_unique_id: `SELECT max(user_unique_id) as last_unique_id FROM public.user where LOWER("state") = LOWER(:state);`,
  find_state: `select state_code from public."state" where LOWER("state_name")= LOWER(:state)`,
  get_users: `select * from user where id = :id;`,
  get_user_by_mail:
    'select id, role_id, name, email, phone, password from public."user" where email = :email',
  get_user_by_username:
    'select * from public."user" where username = :username',
  find_linked_member:
    'select exists(select * from "user_relation" where "user_id"= :userId and "family_member_id"= :familyId)',
  delete_user_detail: `DELETE FROM public."user" WHERE id = :id`,
  add_user_detail:
    'INSERT INTO public."user"("role_id","name", "email", "phone", "password") VALUES(2, :name, :email, :phone, :password)',
  add_client_detail:
    `INSERT INTO public."user"("role_id", "name", "email", "phone", "password","createdAt") VALUES(2, :name, :email, :phone, :password, :createdAt)`,
  get_access_token: `select * from access_tokens WHERE access_token = :token`,
  update_access_token: `UPDATE access_tokens SET "access_token" = :token,expired_on = :exp WHERE user_id = :id`,
  insert_access_token: `INSERT INTO public."access_tokens"("access_token","user_id","expired_on") VALUES(:token,:id,:exp)`,
  userList: `SELECT uuid, role_id, name, email, phone, profile_url
	FROM public."user" where role_id = 2 and is_delete = false and is_active = true;`,
  userDetail: `SELECT uuid, role_id, name, email, phone, profile_url
	FROM public."user" where role_id = 2 and uuid = :userId;`,
  userUpdate: `UPDATE public."user"
	SET name=:name, phone=:phone
	WHERE role_id = 2 and uuid = :userId;`,
  userDelete: `UPDATE public."user"
	SET is_delete=:is_delete, is_active=:is_active
	WHERE role_id = 2 and uuid = :userId;`,
  insert_document: `INSERT INTO public.document(
    file_name, file_type, file_key, location, user_id, created_by)
   VALUES (:fileName, :fileType, :key, :location, :userId, :userId)
   returning file_name;`,
  find_documents: `SELECT file_key as "Key"
	FROM public.document
    where user_id = :userId;`,
  removeFile: `DELETE FROM public.document
    WHERE user_id = :userId;`,
};

const employeeQueries = {
  get_employee: `select * from employee where id = :id`,
};

export default { userQueries, forgetQueries, employeeQueries, resetQueries };
