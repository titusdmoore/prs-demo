using System.ComponentModel.DataAnnotations;

namespace PRSv1._0._0.Models {
    public class Request {
        [Key]
        public int Id { get; set; }
        [StringLength(80)]
        [Required]
        public string Description { get; set; }
        [Required]
        [StringLength(80)]
        public string Justification { get; set; }
        [StringLength(80)]
        public string RejectionReason { get; set; }
        [Required]
        [StringLength(20)]
        public string DeliveryMode { get; set; } = "Pickup";
        [Required]
        [StringLength(10)]
        public string Status { get; set; } = "NEW";
        [Required]
        [RegularExpression(@"^\d+(\.\d{1,2})?$")]
        [Range(0, 99999999999.99)]
        public decimal Total { get; set; } = 0m;

        [Required]
        public int UserId { get; set; }
        public virtual User User { get; set; }

    }
}
