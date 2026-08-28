"use client";

type Props = {
  onSubmit: (formData: FormData) => Promise<void>;
};

export default function MediaUploadForm({ onSubmit }: Props) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    await onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>เลือกไฟล์</label>
        <input type="file" name="file" required />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        อัปโหลด
      </button>
    </form>
  );
}
