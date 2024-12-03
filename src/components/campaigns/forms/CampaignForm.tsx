import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Image, Tag, Video, Save } from 'lucide-react';
import { Button } from '../../common/Button';
import type { Campaign } from '../../../types/campaign';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

const campaignSchema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title must be less than 50 characters'),
  description: z.string().min(1, 'Description is required').max(150, 'Description must be less than 150 characters'),
  tags: z.string(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  markerImage: z
    .instanceof(FileList)
    .refine(files => !files.length || files[0].size <= MAX_FILE_SIZE, 'Max file size is 50MB')
    .optional(),
  videoFile: z
    .instanceof(FileList)
    .refine(files => !files.length || files[0].size <= MAX_FILE_SIZE, 'Max file size is 50MB')
    .optional(),
});

type FormData = z.infer<typeof campaignSchema>;

interface CampaignFormProps {
  initialData?: Partial<Campaign>;
  onSubmit: (data: FormData) => Promise<void>;
  submitLabel: string;
  isSubmitting?: boolean;
}

export function CampaignForm({ initialData = {}, onSubmit, submitLabel, isSubmitting = false }: CampaignFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: initialData.title || '',
      description: initialData.description || '',
      tags: initialData.tags?.join(', ') || '',
      startDate: initialData.startDate || '',
      endDate: initialData.endDate || '',
    },
  });

  const markerImage = watch('markerImage');
  const videoFile = watch('videoFile');

  const handleFormSubmit = async (data: FormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Campaign Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register('title')}
          className="input-with-icon"
          placeholder="Enter campaign title"
        />
        {errors.title && (
          <p className="form-error">{errors.title.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('description')}
          rows={3}
          className="input-with-icon"
          placeholder="Enter campaign description"
        />
        {errors.description && (
          <p className="form-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-group">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tags
        </label>
        <div className="relative">
          <div className="input-icon-wrapper">
            <Tag className="input-icon" />
          </div>
          <input
            type="text"
            {...register('tags')}
            className="input-with-icon"
            placeholder="Enter tags separated by commas"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="input-icon-wrapper">
              <Calendar className="input-icon" />
            </div>
            <input
              type="date"
              {...register('startDate')}
              className="input-with-icon"
            />
          </div>
          {errors.startDate && (
            <p className="form-error">{errors.startDate.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            End Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="input-icon-wrapper">
              <Calendar className="input-icon" />
            </div>
            <input
              type="date"
              {...register('endDate')}
              className="input-with-icon"
            />
          </div>
          {errors.endDate && (
            <p className="form-error">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Marker Image {!initialData.markerImageUrl && <span className="text-red-500">*</span>}
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {initialData.markerImageUrl && !markerImage?.[0] && (
                <img
                  src={initialData.markerImageUrl}
                  alt="Current marker"
                  className="mx-auto h-32 w-32 object-cover mb-4"
                />
              )}
              <Image className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary hover:text-highlight">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    {...register('markerImage')}
                    className="sr-only"
                    accept="image/*"
                  />
                </label>
                {markerImage?.[0] && (
                  <p className="pl-1">Selected: {markerImage[0].name}</p>
                )}
              </div>
            </div>
          </div>
          {errors.markerImage && (
            <p className="form-error">{errors.markerImage.message}</p>
          )}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Video File {!initialData.videoUrl && <span className="text-red-500">*</span>}
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {initialData.videoUrl && !videoFile?.[0] && (
                <video
                  src={initialData.videoUrl}
                  className="mx-auto h-32 w-32 object-cover mb-4"
                  controls
                />
              )}
              <Video className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer bg-white dark:bg-gray-800 rounded-md font-medium text-primary hover:text-highlight">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    {...register('videoFile')}
                    className="sr-only"
                    accept="video/*"
                  />
                </label>
                {videoFile?.[0] && (
                  <p className="pl-1">Selected: {videoFile[0].name}</p>
                )}
              </div>
            </div>
          </div>
          {errors.videoFile && (
            <p className="form-error">{errors.videoFile.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          icon={Save}
          loading={isSubmitting}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}