import instance from './axios';

import { Dashboard } from '@/types/Dashboard.interface';
import { NewDashboardForm, NewColumnForm, InviteMemberForm } from '@/types/post/ModalForm.interface';
import { SignInForm, SignInResponse } from '@/types/post/SignInForm.interface';
import { SignUpForm } from '@/types/post/SignUpForm.interface';
import { UploadImageForm, UploadImageResponse } from '@/types/post/UploadImageForm.interface';

// 회원가입
export const postSignUp = async (formData: SignUpForm) => {
  return await instance.post(`/users`, formData);
};

// 로그인
export const postSignIn = async (formData: SignInForm): Promise<SignInResponse> => {
  const response = await instance.post<SignInResponse>(`/auth/login`, formData);
  return response.data;
};

// 대쉬보드 생성
export const postNewDashboard = async (formData: NewDashboardForm): Promise<Dashboard> => {
  const response = await instance.post(`/dashboards`, formData);
  return response.data;
};

// 컬럼 생성
export const postNewColumn = async (formData: NewColumnForm) => {
  return await instance.post(`/columns`, formData);
};

// 대시보드 멤버 초대하기
export const postInviteMember = async (dashboardId: number, formData: InviteMemberForm) => {
  return await instance.post(`dashboards/${dashboardId}/invitations`, formData);
};

// 이미지 업로드
export const postImage = async (formData: UploadImageForm) => {
  const response = await instance.post<UploadImageResponse>(`/users/me/image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
