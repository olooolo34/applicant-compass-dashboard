
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Applicant {
  id: string;
  profile_picture: string | null;
  full_name: string;
  gender: string;
  age: number;
  passport_number: string;
  phone_number: string;
  job: string;
  status: 'accepted' | 'pending' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export const useApplicants = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchApplicants = async () => {
    try {
      const { data, error } = await supabase
        .from('applicants')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplicants((data || []).map((item: any) => ({
        ...item,
        job: item.job || '',
        status: item.status as 'accepted' | 'pending' | 'rejected'
      })));
    } catch (error) {
      console.error('Error fetching applicants:', error);
      toast({
        title: "Error",
        description: "Failed to load applicants",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addApplicant = async (applicant: Omit<Applicant, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('applicants')
        .insert([{
          ...applicant,
          job: applicant.job || ''
        }])
        .select()
        .single();

      if (error) throw error;
      const typedData: Applicant = {
        ...data,
        job: data.job || '',
        status: data.status as 'accepted' | 'pending' | 'rejected'
      };
      setApplicants(prev => [typedData, ...prev]);
      toast({
        title: "Success",
        description: `${applicant.full_name} has been added successfully.`,
      });
      return typedData;
    } catch (error) {
      console.error('Error adding applicant:', error);
      toast({
        title: "Error",
        description: "Failed to add applicant",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateApplicant = async (id: string, updates: Partial<Applicant>) => {
    try {
      const { data, error } = await supabase
        .from('applicants')
        .update({
          ...updates,
          job: updates.job || ''
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const typedData: Applicant = {
        ...data,
        job: data.job || '',
        status: data.status as 'accepted' | 'pending' | 'rejected'
      };
      setApplicants(prev => prev.map(a => a.id === id ? typedData : a));
      toast({
        title: "Success",
        description: "Applicant updated successfully.",
      });
      return typedData;
    } catch (error) {
      console.error('Error updating applicant:', error);
      toast({
        title: "Error",
        description: "Failed to update applicant",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteApplicant = async (id: string) => {
    try {
      const { error } = await supabase
        .from('applicants')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setApplicants(prev => prev.filter(a => a.id !== id));
      toast({
        title: "Success",
        description: "Applicant deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting applicant:', error);
      toast({
        title: "Error",
        description: "Failed to delete applicant",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateStatus = async (id: string, status: 'accepted' | 'pending' | 'rejected') => {
    return updateApplicant(id, { status });
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  return {
    applicants,
    loading,
    addApplicant,
    updateApplicant,
    deleteApplicant,
    updateStatus,
    refetch: fetchApplicants
  };
};
